import { ES256KSigner, hexToBytes } from 'did-jwt';
import { createVerifiableCredentialJwt } from 'did-jwt-vc';

interface form {
    studentId: string,
    name: string,
    yearOfAdmission: string,
    department: string,
    faculty: string
}

const key = '8eb63d435de4d634bc5f3df79c361e9233f55c9c2fca097758eefb018c4c61df';
const signer = ES256KSigner(hexToBytes(key))
const issuer = {
    did: 'did:web:skounis.github.io',
    signer: signer
}

export default function signVC(student : form) {
    const vcPayload = {
        sub: 'did:web:skounis.github.io',
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