import { CheckCircle2, ImageIcon, UploadIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import {
  PROGRESS_INTERVAL_MS,
  PROGRESS_STEP,
  REDIRECT_DELAY_MS,
  MAX_UPLOAD_SIZE,
} from "../lib/constants";

interface UploadProps {
  onComplete?: (base64Data: string) => void;
}

const Upload = ({ onComplete }: UploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string>("");

  const { isSignedIn } = useOutletContext<AuthContext>();

  const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png"];

  const validateFile = (file: File): boolean => {
    setError("");


    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      setError("Invalid file type. Please upload JPG or PNG images.");
      return false;
    }


    if (file.size > MAX_UPLOAD_SIZE) {
      setError(
        `File is too large. Maximum size is 50MB (${(file.size / 1024 / 1024).toFixed(2)}MB provided).`,
      );
      return false;
    }

    return true;
  };

  const processFile = (file: File) => {
    if (!isSignedIn) return;

    if (!validateFile(file)) {
      return;
    }

    setFile(file);
    setProgress(0);

    const reader = new FileReader();
    let interval: NodeJS.Timeout | null = null;

    reader.onloadend = () => {
      if (reader.result === null || typeof reader.result !== "string") {
        if (interval) clearInterval(interval);
        setFile(null);
        setProgress(0);
        return;
      }

      const base64Data = reader.result;

      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (interval) clearInterval(interval);
            setTimeout(() => {
              onComplete?.(base64Data);
            }, REDIRECT_DELAY_MS);
            return 100;
          }
          return prev + PROGRESS_STEP;
        });
      }, PROGRESS_INTERVAL_MS);
    };

    reader.onerror = () => {
      if (interval) clearInterval(interval);
      setFile(null);
      setProgress(0);
    };

    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSignedIn) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (!isSignedIn) return;

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isSignedIn) return;
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  return (
    <div className="upload">
      {!file ? (
        <div
          className={`dropzone ${isDragging ? "is-dragging" : ""}`}
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="drop-input"
            accept=".jpg,.jpeg,.png"
            disabled={!isSignedIn}
            onChange={handleChange}
          />

          <div className="drop-content">
            <div className="drop-icon">
              <UploadIcon size={20} />
            </div>
            <p>
              {isSignedIn
                ? "Click to upload or just drag and drop"
                : "Sign in or sign up with Puter to upload"}
            </p>
            <p className="help">Maximum file size 50MB.</p>
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      ) : (
        <div className="upload-status">
          <div className="status-content">
            <div className="status-icon">
              {progress === 100 ? (
                <CheckCircle2 className="check" />
              ) : (
                <ImageIcon className="image" />
              )}
            </div>

            <h3>{file.name}</h3>

            <div className="progress">
              <div className="bar" style={{ width: `${progress}%` }} />

              <p className="status-text">
                {progress === 100
                  ? "Analyzing Floor Plan... "
                  : "Redirecting..."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
