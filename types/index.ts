export type fnWithSafeProp = <T extends boolean = false>(options?: {
  safe?: T;
}) => Promise<T extends true ? boolean : true>;
