import React from 'react'
import type { HtmlTextareaAttributes } from '@/types/elements'

export interface ITextFieldProps extends HtmlTextareaAttributes<HTMLTextAreaElement> {}

export const TextField = React.forwardRef<HTMLTextAreaElement, ITextFieldProps>(function TextField(
  props: ITextFieldProps,
  ref
) {
  const { className, ...rest } = props
  return (
    <textarea
      ref={ref}
      className={`w-full md:w-1/2 border border-black-20 p-2 rounded text-black-100 ${
        className ?? ''
      }`}
      {...rest}
    />
  )
})
