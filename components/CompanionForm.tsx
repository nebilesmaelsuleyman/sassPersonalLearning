'use client'
import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { subjects } from '@/constants'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '@radix-ui/react-select'
 
const formSchema = z.object({
  topic: z.string(),
  name:z.string(),
    subject: z.string(),
    Style: z.string(),
    duration: z.number(),
})

const CompanionForm= () => {
 
    const form= useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
        topic:'',
        name:'',
        subject:'',
        Style:'',
        duration:15,
    }
    })

  const onSubmit = (data:z.infer<typeof formSchema>) => {
    console.log(data)

  }

  return (
   <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className={undefined}>
              <FormLabel className={undefined}>name</FormLabel>
              <FormControl>
                <Input placeholder="enter companion name" {...field} className='input'                  />
              </FormControl>
              <FormMessage className={undefined} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className={undefined}>
              <FormLabel className={undefined}>subject</FormLabel>
              <FormControl>
                
                <Select 
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}>
      <SelectTrigger className="input capitalize">
        <SelectValue placeholder="Select a subject" className="capitalize"/>
      </SelectTrigger>
      <SelectContent>
        {subjects.map((subject)=>(
            <SelectItem key={subject} value={subject} className="capitalize">{subject}</SelectItem>
        ))}
      </SelectContent>
    </Select>
              </FormControl>
              <FormMessage className={undefined} />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className={undefined}>
              <FormLabel className={undefined}>name</FormLabel>
              <FormControl>
                <Input placeholder="enter companion name" {...field} className='input'                  />
              </FormControl>
              <FormMessage className={undefined} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className={undefined}>
              <FormLabel className={undefined}>name</FormLabel>
              <FormControl>
                <Input placeholder="enter companion name" {...field} className='input'                  />
              </FormControl>
              <FormMessage className={undefined} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className={undefined}>
              <FormLabel className={undefined}>name</FormLabel>
              <FormControl>
                <Input placeholder="enter companion name" {...field} className='input'                  />
              </FormControl>
              <FormMessage className={undefined} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className={undefined}>
              <FormLabel className={undefined}>name</FormLabel>
              <FormControl>
                <Input placeholder="enter companion name" {...field} className='input'                  />
              </FormControl>
              <FormMessage className={undefined} />
            </FormItem>
          )}
        />
        <Button type="submit" className={undefined} variant={undefined} size={undefined}>Submit</Button>
      </form>
    </Form>
  )
  
}

export default CompanionForm