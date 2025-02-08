import React from 'react';
import { Text } from 'react-native';
import { Link, LinkProps } from 'expo-router';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const buttonVariants = cva('inline-flex items-center justify-center', {
  variants: {
    variant: {
      default: 'border border-white rounded-md',
    },
    size: {
      default: 'px-12 py-4',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface CustomLinkProps
  extends LinkProps,
    VariantProps<typeof buttonVariants> {
  className?: string;
  asChild?: boolean;
}

export const LinkButton = ({
  className,
  variant,
  size,
  href,
  children,
  ...props
}: CustomLinkProps) => {
  return (
    <Link
      className={cn(buttonVariants({ variant, size, className }))}
      href={href}
      {...props}
    >
      <Text className="text-white text-lg text-center font-bold">
        {children}
      </Text>
    </Link>
  );
};
