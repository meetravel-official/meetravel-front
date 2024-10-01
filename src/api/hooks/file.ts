import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "../request";
import { apiRoute } from "../routes/apiRoutes";

export const usePostFileUpload = (filePath: "PROFILE") => {
  return useMutation<{ fileUrl?: string }, AxiosError, FormData>({
    mutationFn: (file) => api.postFile(apiRoute.file(filePath), file),
  });
};
