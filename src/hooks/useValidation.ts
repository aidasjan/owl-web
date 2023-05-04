import { useToast } from '@chakra-ui/toast'
import { useState } from 'react'

interface Props {
  requiredFields: string[]
}

export const useValidation = ({ requiredFields }: Props) => {
  const toast = useToast()

  const initializeInvalidFields = () => {
    const fields = {}
    requiredFields.forEach(key => {
      fields[key] = false
    })
    return fields
  }

  const [invalidFields, setInvalidFields] = useState<any>(initializeInvalidFields())

  const validate = value => {
    let isValid = true
    const fields = {}
    requiredFields.forEach(key => {
      if (!value[key]) {
        fields[key] = true
        isValid = false
      } else {
        fields[key] = false
      }
    })
    setInvalidFields(fields)
    if (!isValid) {
      toast({ status: 'error', title: 'Please fill all fields' })
    }
    return isValid
  }

  return { invalidFields, validate }
}
