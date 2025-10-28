import placeholder from "@/assets/general/placeholder.png";

import React, { useState } from "react";

type ImageWithFallbackProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc = placeholder.src,
  onError,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    onError?.(e); // call user-provided onError if any
  };

  return <img {...rest} src={hasError ? fallbackSrc : src} onError={handleError} />;
};

export default ImageWithFallback;
