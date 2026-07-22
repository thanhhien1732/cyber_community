import { describe, expect, it, jest } from "@jest/globals"
import { authService } from "../../services/auth.service"
import prisma from "../prisma/init.prisma"
import { BadRequestException } from "../helpers/exception.helper"

describe("Register", () => {
    beforeEach(() => {
        // console.log("Hàm beforeEach chạy")
        jest.spyOn(prisma.users, "findUnique")
        jest.spyOn(prisma.users, "create")
    })

    afterEach(() => {
        // console.log("Hàm afterEach chạy")
        jest.restoreAllMocks()
    })

    //Case 1: Đăng ký với thông tin hợp lệ
    it("Case 1: Đăng ký với thông tin hợp lệ", async () => {
        prisma.users.findUnique.mockResolvedValue(null)  // giả lập để hàm luôn luôn trả null
        // prisma.users.findUnique.mockReturn()   // nếu không có await

        prisma.users.create.mockResolvedValue({
            id: 11,
            email: 'lethitest@gmail.com',
            fullName: 'lethitest',
            avatar: null,
            password: '$2b$10$nYpkkVNz64VPPoGciaXfb.nTc7XSDRSeMws6iCzX1Onb5Fk9Zc7Aq',
            facebookId: null,
            googleId: null,
            roleId: 2,
            deletedBy: 0,
            isDeleted: false,
            deletedAt: null,
            createdAt: '2025 - 10-02T16: 30: 23.000Z',
            updatedAt: '2025 - 10-02T16: 30: 23.000Z'
        })  // console.log({ userNew }) ra và copy nguyên object của userNew paste vào đây

        const req = {
            body: {
                email: "lethitest@gmail.com",
                password: "1234",
                fullName: "lethitest"
            }
        }
        const result = await authService.register(req)

        expect(result).not.toHaveProperty("password")
        // Cách 2: Viết tay
        // if (result.password !== undefined) {
        //     throw new Error("Kết quả có password")
        // }

        expect(result).toHaveProperty("id")
    })

    it("Case 2: Từ chối email đã tồn tại", async () => {
        prisma.users.findUnique.mockResolvedValue({ id: 11, email: "lethitest@gmail.com" })

        await expect(authService.register({
            body: {
                email: "lethitest@gmail.com",
                password: "1234",
                fullName: "lethitest"
            }
        })).rejects.toBeInstanceOf(BadRequestException)

        expect(prisma.users.create).not.toHaveBeenCalled()
    })
})
