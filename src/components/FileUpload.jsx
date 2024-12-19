import { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";

export const FileUpload = ({
   fieldChange,
   mediaUrl,
   placeholder,
   acceptedTypes = "*/*",
   icon = "/file-upload.svg",
   containerClassName = "h-36 w-36", // Default size
}) => {
   const fileRef = useRef(null);
   const fileUrlRef = useRef(mediaUrl);

   const onDrop = useCallback(
      (acceptedFiles) => {
         fileRef.current = acceptedFiles;
         fieldChange(acceptedFiles);
         fileUrlRef.current = URL.createObjectURL(acceptedFiles[0]);
      },
      [fieldChange]
   );

   const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: acceptedTypes,
   });

   return (
      <div
         {...getRootProps()}
         className={`flex flex-col justify-center items-center rounded-xl cursor-pointer ${containerClassName}`}
      >
         <input {...getInputProps()} className="cursor-pointer" />
         {fileUrlRef.current ? (
            <div
               className={`border border-muted-foreground rounded-lg overflow-hidden ${containerClassName}`}
            >
               {acceptedTypes.includes("image") ? (
                  <img
                     src={fileUrlRef.current}
                     alt="file"
                     className="w-full h-full object-cover"
                  />
               ) : acceptedTypes.includes("video") ? (
                  <video
                     src={fileUrlRef.current}
                     controls
                     className="w-full h-full object-cover"
                  />
               ) : (
                  <p className="text-center text-muted-foreground p-2 text-xs">
                     {fileRef.current?.[0]?.name}
                  </p>
               )}
            </div>
         ) : (
            <div
               className={`p-5 border border-muted-foreground rounded-lg text-center flex flex-col justify-center items-center ${containerClassName}`}
            >
               <img src={icon} alt="file-upload" className="m-auto h-16 w-16" />
               <p className="text-xs text-muted-foreground mt-2">
                  {placeholder}
               </p>
            </div>
         )}
      </div>
   );
};
