declare type ComponentProps<T = {}> = 
  import('react').HTMLAttributes<{}> & 
  import('react').PropsWithRef<T>