import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { View, Text } from 'react-native';

const textDetailsVariants = cva('', {
  variants: {
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
    },
  },
  defaultVariants: {
    align: 'start',
  },
});

interface TextDetailsProps extends VariantProps<typeof textDetailsVariants> {
  label: string;
  content: string;
  size?: 'sm' | 'lg';
  className?: string;
}

const TextDetails = ({
  label,
  content,
  align,
  size = 'sm',
  className,
}: TextDetailsProps) => {
  const alignClass = textDetailsVariants({ align });
  const labelClass = size === 'lg' ? 'text-xl' : 'text-base';
  const contentClass = size === 'lg' ? 'text-4xl' : 'text-xl';

  return (
    <View className={cn(alignClass, 'flex mb-4 ' + className)}>
      <Text className={cn('font-bold text-white', labelClass)}>{label}</Text>
      <Text className={cn('font-bold text-white', contentClass)}>
        {content}
      </Text>
    </View>
  );
};

export { TextDetails };
