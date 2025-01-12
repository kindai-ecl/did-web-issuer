import { ES256KSigner, hexToBytes } from 'did-jwt';
import { createVerifiableCredentialJwt } from 'did-jwt-vc';

interface form {
    studentId: string,
    name: string,
    yearOfAdmission: string,
    department: string,
    faculty: string
}

const key = '4daafdbbddcda929f054d45db6cbd6f68e78ab7bf5a0b1dceb0574e73caf8fca';
const signer = ES256KSigner(hexToBytes(key))
const issuer = {
    did: 'did:web:lcyou.github.io',
    signer: signer
}

export default function signVC(student : form) {
    const vcPayload = {
        sub: 'did:web:lcyou.github.io',
        nbf: Math.round((new Date()).getTime() / 1000),
        vc: {
            '@context': ['https://www.w3.org/2018/credentials/v1'],
            type: ['VerifiableCredential'],
            credentialSubject: {
                degree:{
                    id: student.studentId,
                    name: student.name,
                    yearOfAdmission: student.yearOfAdmission,
                    department: student.department,
                    faculty: student.faculty
                }
            }
        }
    }
    const vcJwt = createVerifiableCredentialJwt(vcPayload, issuer)
    return vcJwt
}