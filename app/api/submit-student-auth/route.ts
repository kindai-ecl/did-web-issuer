import { NextResponse } from 'next/server'
import { members } from '@/data/members'
import signVC from '@/lib/signVC'
import { signIn } from 'next-auth/react'

export async function POST(request: Request) {
  try {
    const { name, yearOfAdmission, studentId, department, faculty } = await request.json()
    
    const member = members.find(m => 
      m.name === name && 
      m.yearOfAdmission === yearOfAdmission && 
      m.studentId === studentId && 
      m.department === department && 
      m.faculty === faculty
    )

    if (!member) {
      return NextResponse.json({ message: 'Member not found' }, { status: 404 })
    }

    const vcjwt = await signVC(member)

    // const session = await signIn('credentials', {
    //     id: studentId,
    //     name: name,
    // })
    // console.log('Session:', session)

    return NextResponse.json({ message: 'Form submitted successfully', vc: vcjwt }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}