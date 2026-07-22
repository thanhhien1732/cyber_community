import { CSSProperties, ImgHTMLAttributes } from "react";

type AppImageProps = {
   alt?: string;
   priority?: boolean;
   style?: CSSProperties;
   objectFit?: CSSProperties["objectFit"];
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "alt">;

export default function ImageCustom({ alt = "", priority = false, style = {}, objectFit = "cover", ...props }: AppImageProps) {
   return (
      <img
         {...props}
         alt={alt}
         loading={priority ? "eager" : props.loading || "lazy"}
         style={{ width: "100%", height: "100%", objectFit, display: "block", ...style }}
      />
   );
}
