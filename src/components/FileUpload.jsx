import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({
   fieldChange,
   mediaUrl,
   placeholder,
   acceptedTypes = "*/*",
   icon = "/file-upload.svg",
}) => {
   const [file, setFile] = useState(null);
   const [fileUrl, setFileUrl] = useState(mediaUrl);

   const onDrop = useCallback(
      (acceptedFiles) => {
         setFile(acceptedFiles);
         fieldChange(acceptedFiles);
         setFileUrl(URL.createObjectURL(acceptedFiles[0]));
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
         className={"flex flex-col rounded-xl cursor-pointer"}
      >
         <input {...getInputProps()} className="cursor-pointer" />
         {fileUrl ? (
            <div className="border border-muted-foreground rounded-lg">
               {acceptedTypes.includes("image") ? (
                  <img
                     src={fileUrl}
                     alt="file"
                     className="h-32 w-32 rounded-lg object-cover"
                  />
               ) : acceptedTypes.includes("video") ? (
                  <video
                     src={fileUrl}
                     controls
                     className="h-32 w-32 rounded-lg"
                  />
               ) : (
                  <p className="text-center text-muted-foreground">
                     {file[0]?.name}
                  </p>
               )}
            </div>
         ) : (
            <div className="p-5 border border-muted-foreground rounded-lg text-center">
               <img
                  src={icon}
                  alt="file-upload"
                  width={60}
                  height={60}
                  className="m-auto"
               />
               <p className="text-xs text-muted-foreground">{placeholder}</p>
            </div>
         )}
      </div>
   );
};

export default FileUpload;
