import React from 'react'

export interface ITextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const TextInput = React.forwardRef<HTMLInputElement, ITextInputProps>(function TextInput(
  props: ITextInputProps,
  ref
) {
  const { className, ...rest } = props
  return (
    <input
      ref={ref}
      type="text"
      className={`w-full md:w-1/2 border border-black-20 p-2 rounded text-black-100 ${
        className ?? ''
      }`}
      {...rest}
    />
  )
})
