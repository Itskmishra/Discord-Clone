import { generateComponents } from "@uploadthing/react";

import type { OurFileRouter } from "@/app/(server)/api/uploadthing/core";

export const { UploadButton, UploadDropzone, Uploader } =
    generateComponents<OurFileRouter>();