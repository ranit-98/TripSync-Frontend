import type { ApiResponse } from "@/typescript/interface/api";
import { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";

type UploadedImageData = {
  avatarUrl?: string | null;
  coverUrl?: string | null;
  url?: string | null;
};

type UploadMutationFn = (formData: FormData) => Promise<ApiResponse<UploadedImageData>>;

export type ImageUploadState = {
  /** True while upload to the server is in progress */
  isUploading: boolean;
  /** The final URL returned by the backend after a successful upload */
  uploadedUrl: string | null;
  /** Local object URL for instant preview (auto-revoked on next pick) */
  previewUrl: string;
  /** Trigger upload — creates FormData and submits to the mutation function */
  upload: (file: File, fieldName?: string, extraFields?: Record<string, string>) => Promise<string | null>;
  /** Reset state back to idle */
  reset: () => void;
};

/**
 * Reusable hook for uploading files to backend endpoints.
 * Automatically handles local object URL preview creation/revocation,
 * loading state, and error handling.
 *
 * @param uploadMutation - The react-query mutateAsync function that sends the FormData
 * @param extractUrl - Callback to extract the uploaded file's URL from the mutation response
 */
export const useImageUpload = (
  uploadMutation: UploadMutationFn,
  extractUrl: (response: ApiResponse<UploadedImageData>) => string = (res) =>
    res?.data?.data?.avatarUrl || res?.data?.data?.coverUrl || res?.data?.data?.url || ""
): ImageUploadState => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const prevPreviewRef = useRef("");

  const revokePreview = useCallback(() => {
    if (prevPreviewRef.current) {
      URL.revokeObjectURL(prevPreviewRef.current);
      prevPreviewRef.current = "";
    }
  }, []);

  const reset = useCallback(() => {
    revokePreview();
    setIsUploading(false);
    setUploadedUrl(null);
    setPreviewUrl("");
  }, [revokePreview]);

  const upload = useCallback(
    async (file: File, fieldName = "avatar", extraFields: Record<string, string> = {}): Promise<string | null> => {
      revokePreview();
      const objectUrl = URL.createObjectURL(file);
      prevPreviewRef.current = objectUrl;
      setPreviewUrl(objectUrl);

      setIsUploading(true);
      setUploadedUrl(null);

      const formData = new FormData();
      formData.append(fieldName, file);
      Object.entries(extraFields).forEach(([key, value]) => {
        if (value.trim()) {
          formData.append(key, value.trim());
        }
      });

      try {
        const response = await uploadMutation(formData);
        const url = extractUrl(response);
        setUploadedUrl(url);
        setIsUploading(false);
        return url;
      } catch {
        toast.error("Image upload failed.");
        setIsUploading(false);
        return null;
      }
    },
    [uploadMutation, extractUrl, revokePreview]
  );

  return { isUploading, uploadedUrl, previewUrl, upload, reset };
};
