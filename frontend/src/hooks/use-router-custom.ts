import { useAppDispatch } from "@/redux/hooks";
import { SET_LOADING_PAGE } from "@/redux/slices/setting.slice";
import { useNavigate } from "react-router-dom";
import { useEffect, useTransition } from "react";

function useRouter() {
   const navigate = useNavigate();
   const [isPending, startTransition] = useTransition();
   const dispatch = useAppDispatch();
   useEffect(() => {
      // console.log({ isPending });
      dispatch(SET_LOADING_PAGE(isPending));
   }, [isPending]);

   function back() {
      startTransition(() => {
         navigate(-1);
      });
   }
   function forward() {
      startTransition(() => {
         navigate(1);
      });
   }
   function refresh() {
      startTransition(() => {
         window.location.reload();
      });
   }
   function push(path: string) {
      startTransition(() => {
         navigate(path);
      });
   }
   function replace(path: string) {
      startTransition(() => {
         navigate(path, { replace: true });
      });
   }
   function prefetch(_href: string) {
      // React Router loads these client-side routes from the current bundle.
   }
   return { back, forward, push, refresh, replace, prefetch, isPending };
}

export default useRouter;
