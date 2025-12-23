import { FormCardWrapper_Skeleton } from "@/components/form-card-wrapper/form-card-wrapper.skeleton";
import { Button_Skeleton } from "@/components/skeleton/button.skeleton";
import { Field_Skeleton } from "@/components/skeleton/field.skeleton";
import { CardContent, CardFooter } from "@/components/ui/card";
import { FC } from "react";

type TForm_Skeleton = {
  fieldNumber: number;
  buttonNumber?: number;
};

export const Form_Skeleton: FC<TForm_Skeleton> = ({
  fieldNumber: fieldsNumber,
  buttonNumber = 1,
}) => {
  return (
    <FormCardWrapper_Skeleton>
      <>
        <CardContent>
          {new Array(fieldsNumber).fill("field").map((_, index) => (
            <Field_Skeleton key={`field-skeleton-${index}`} />
          ))}
        </CardContent>

        <CardFooter>
          {new Array(buttonNumber).fill("button").map((_, index) => (
            <Button_Skeleton key={`button-skeleton-${index}`} />
          ))}
        </CardFooter>
      </>
    </FormCardWrapper_Skeleton>
  );
};
