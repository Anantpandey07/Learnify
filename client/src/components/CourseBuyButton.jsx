import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { useCreateCheckoutSessionMutation } from '@/features/api/purchaseApi'
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function CourseBuyButton(courseId) {
  const[createCheckoutSession, {data, isLoading, isSuccess, isError, error}] = useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    await createCheckoutSession(courseId);
  }

  useEffect (() =>{
    if(isSuccess){
      if(data?.url){
        window.location.href = data.url; // redirect to stripe checkout
        // It performs a client-side redirect to the Stripe Checkout page using the URL returned by the server.
      }
      else{
        toast.error("Invalid Response from server.")
      }
    }
    if(isError){
      toast.error(error?.data?.message || "Failed to create checkout session.")
    }
  }, [isSuccess, error, isError, data]);
  return (
    <Button disabled={isLoading} onClick ={purchaseCourseHandler} className='w-full'>
      {
        isLoading ? (
          <><Loader2 className='animate-spin mr-2 h-4 w-4'/> Loading ..</>
          
        ): ("Purchase Course")
      }
      </Button>
  )
}
