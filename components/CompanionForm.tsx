"use client";

import React from "react";
import { z } from "zod";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subjects } from "@/constants";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const formSchema = z.object({
  topic: z.string(),
  name: z.string(),
  subject: z.string(),
  style: z.string(),         
  voice: z.string(),        
  duration: z.coerce.number(),
});

const CompanionForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as Resolver<z.infer<typeof formSchema>>,
    defaultValues: {
      topic: "",
      name: "",
      subject: "",
      style: "",
      voice: "",
      duration: 15,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

      
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem  className={undefined} >
              <FormLabel className={undefined} >Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter companion name"
                  {...field}
                  className="input"
                />
              </FormControl>
              <FormMessage className={undefined}  />
            </FormItem>
          )}
        />

    
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className={undefined} >
              <FormLabel className={undefined} >Subject</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="input capitalize">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent className={undefined} >
                    {subjects.map((subject) => (
                      <SelectItem
                        key={subject}
                        value={subject}
                        className="capitalize"
                      >
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className={undefined}  />
            </FormItem>
          )}
        />

      
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem className={undefined} >
              <FormLabel className={undefined} >What should the companion help with?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Derivatives & Integrals"
                  {...field}
                  className="input"
                />
              </FormControl>
              <FormMessage  className={undefined} />
            </FormItem>
          )}
        />

     
        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem className={undefined} >
              <FormLabel className={undefined} >Voice</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="input">
                    <SelectValue placeholder="Select a voice" />
                  </SelectTrigger>
                  <SelectContent className={undefined} >
                    <SelectItem className={undefined}  value="male">Male</SelectItem>
                    <SelectItem className={undefined}  value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className={undefined} />
            </FormItem>
          )}
        />

    
        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem className={undefined} >
              <FormLabel className={undefined} >Style</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="input">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent className={undefined} >
                    <SelectItem className={undefined}  value="formal">Formal</SelectItem>
                    <SelectItem className={undefined}  value="casual">Casual</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className={undefined}  />
            </FormItem>
          )}
        />

        
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem className={undefined} > 
              <FormLabel className={undefined} >Estimated Session Duration (minutes)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="15"
                  {...field}
                  className="input"
                />
              </FormControl>
              <FormMessage className={undefined} />
            </FormItem>
          )}
        />

        <Button variant={undefined} size={undefined} type="submit" className="w-full">
          Build Your Companion
        </Button>
      </form>
    </Form>
  );
};

export default CompanionForm;
