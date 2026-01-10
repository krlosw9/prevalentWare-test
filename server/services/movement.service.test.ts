import { describe, expect, it, mock, beforeEach } from "bun:test";
import { MovementService } from "./movement.service";
import { IMovementRepository } from "../repositories/interfaces";
import { Prisma } from "@prisma/client";

describe("MovementService", () => {
    let movementService: MovementService;
    let mockRepository: IMovementRepository;

    beforeEach(() => {
        mockRepository = {
            findAll: mock(() => Promise.resolve([])),
            findById: mock(() => Promise.resolve(null)),
            create: mock((data: any) => Promise.resolve({ id: "1", ...data } as any)),
            update: mock(() => Promise.resolve({} as any)),
            delete: mock(() => Promise.resolve({} as any)),
            findByUserId: mock(() => Promise.resolve([])),
            getTotals: mock(() => Promise.resolve({ totalBalance: 0, totalCount: 0 })),
        };
        movementService = new MovementService(mockRepository);
    });

    it("should return movements and totals from repository", async () => {
        const movements = [
            { id: "1", concept: "INCOME", amount: new Prisma.Decimal(100), date: new Date() },
        ] as any;
        const totals = { totalBalance: 100, totalCount: 1 };

        (mockRepository.findAll as any).mockReturnValue(Promise.resolve(movements));
        (mockRepository.getTotals as any).mockReturnValue(Promise.resolve(totals));

        const response = await movementService.getMovements();

        expect(response.movements).toEqual(movements);
        expect(response.totalBalance).toBe(100);
        expect(response.totalCount).toBe(1);
    });

    it("should throw error when creating movement with negative amount", async () => {
        const data = { concept: "INCOME", amount: -10, date: new Date() };

        expect(movementService.createMovement(data)).rejects.toThrow("El monto debe ser un número válido mayor a 0");
    });

    it("should create movement correctly with positive amount", async () => {
        const data = { concept: "INCOME", amount: 50, date: new Date() };

        const result = await movementService.createMovement(data);

        expect(result).toBeDefined();
        expect(mockRepository.create).toHaveBeenCalled();
    });
});
