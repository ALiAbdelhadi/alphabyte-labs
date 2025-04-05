import Image from 'next/image';

type CustomImageProps = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    className?: string;
    quality?: number
};

export const CustomImage = ({ src, alt, width, height, fill = false, className, quality }: CustomImageProps) => {
    return (
        <Image
            src={src}
            alt={alt}
            width={fill ? undefined : width}
            height={fill ? undefined : height}
            fill={fill}
            className={className}
            loading="lazy"
            quality={quality}
            decoding="async"
        />
    );
};
