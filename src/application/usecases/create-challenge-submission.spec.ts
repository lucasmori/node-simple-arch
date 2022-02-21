import crypto from 'crypto'

import {CreateChallengeSubmission} from "./create-challenge-submission";
import {InMemoryStudentsRepository} from "../../tests/repositories/in-memory-students-repository";
import {InMemoryChallengesRepository} from "../../tests/repositories/in-memory-challenges-repository";
import {Student} from "../../domain/entities/student";
import {Challenge} from "../../domain/entities/challenge";


const generate = function () {
    return crypto.randomBytes(20).toString('hex')
}


describe('Create challenge submission use case', () => {
    it('Should be able to create a new challenge submission', async () => {
        const studentsRepository = new InMemoryStudentsRepository()
        const challengesRepository = new InMemoryChallengesRepository()

        const student = Student.create({
            name: generate(),
            email: generate()
        })

        const challenge = Challenge.create({
            title: generate(),
            instructionsUrl: generate()
        })

        studentsRepository.items.push(student)
        challengesRepository.items.push(challenge)
        const sut = new CreateChallengeSubmission(studentsRepository, challengesRepository);

        const result = await sut.execute({
            studentId: student.id,
            challengeId: challenge.id
        })

        expect(result).toBeTruthy()
    })
})