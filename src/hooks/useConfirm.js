import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { open } from "@/store/reducers/confirmModalReducer";

let resolver = null;

export const useConfirm = () => {
   const dispatch = useDispatch();

   const confirm = useCallback(
      (title, message) => {
         return new Promise((resolve) => {
            resolver = resolve;
            dispatch(
               open({
                  title,
                  message,
               })
            );
         });
      },
      [dispatch]
   );

   return confirm;
};

export const getResolver = () => resolver;
export const clearResolver = () => {
   resolver = null;
};
