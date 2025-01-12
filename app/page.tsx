'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { form, formSchema } from '../data/formSchema'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { QRCodeSVG } from "qrcode.react"

import { department, faculty } from '@/data/cource'

export default function StudentAuthForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [vc, setVc] = useState('')
  const { toast } = useToast()

  const form = useForm<form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      yearOfAdmission: "",
      studentId: "",
      department: "",
      faculty: "",
    },
  })

  async function onSubmit(values: form) {
    setIsSubmitting(true)
    // Simulate API call
    try {
      const response = await fetch('/api/submit-student-auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
      });

      if (!response.ok) {
      throw new Error('Network response was not ok');
      }
      toast({
        title: 'Succsess Authorization',
        description: "Your form has been submitted successfully",
      })

      const data = await response.json();
      setVc(data.vc);
    }
    catch (error) {
      console.log('Error:', error);
      toast({
        title: 'Error',
        description: "An error occurred while submitting the form. Please try again later.",
      })
    }
    setIsSubmitting(false)
  }



  return (
    <Card className="w-full max-w-2xl mx-auto mt-8 mb-8">
      {vc ? (
        <>
        <CardHeader>
          <CardTitle>Verification Complete</CardTitle>
        </CardHeader>
        <CardContent className='w-full flex flex-col items-center justify-center'>
          <div className="flex flex-col justify-center mb-5">
            <p className="text-lg font-semibold">Certificate of affiliation with ecl lab</p>
            <p className="mt-2">Your certificate has been successfully generated. </p>
            <p className=''>You can now download it or share it with others.</p>
          </div>
          <div className="flex aspect-square max-w-[450px] lg:w-[450px] bg-neutral-100 rounded-lg">
            <QRCodeSVG
                value={vc}
                className="w-full h-full p-6"
                bgColor="#f5f5f5"
                imageSettings={{
                  src: "/favicon.ico",
                  x: undefined,
                  y: undefined,
                  height: 24,
                  width: 24,
                  excavate: true,
                }}
            />
          </div>
        </CardContent>
        </>
      ) : (
        <>
      <CardHeader>
        <CardTitle>Student Authentication Form</CardTitle>
        <CardDescription>Complete this form to authenticate your student application.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="yearOfAdmission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year of Admission</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year of admission" />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(10)].map((_, i) => {
                          const year = new Date().getFullYear() - i;
                          return (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student ID Number</FormLabel>
                  <FormControl>
                    <Input 
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      placeholder="1234567890"
                      maxLength={10}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {department.map((dept) => (
                        <SelectItem key={dept.value} value={dept.value}>
                          {dept.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="faculty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Faculty</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your faculty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {faculty.map((fac) => (
                        <SelectItem key={fac.value} value={fac.value}>
                          {fac.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="photo"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>Student ID Photo</FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) onChange(file)
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Upload a clear photo of your student ID card. Max file size: 5MB.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <Toaster />
      </>
      )}
    </Card>
  )
}

