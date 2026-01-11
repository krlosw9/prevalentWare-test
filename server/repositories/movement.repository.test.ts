import { describe, expect, it, mock, beforeEach } from "bun:test";
import { MovementRepository } from "./movement.repository";
import { prisma } from "@/lib/auth";

// Mock de Prisma
mock.module("@/lib/auth", () => ({
  prisma: {
    movement: {
      aggregate: mock(),
      count: mock(),
      findMany: mock(),
    },
  },
}));

describe("MovementRepository", () => {
  let repository: MovementRepository;

  beforeEach(() => {
    repository = new MovementRepository();
  });

  it("should calculate totals correctly from database aggregates", async () => {
    // Configuramos los mocks de prisma
    (prisma.movement.aggregate as any)
      .mockResolvedValueOnce({ _sum: { amount: 1000 } }) // INCOME
      .mockResolvedValueOnce({ _sum: { amount: 400 } }); // EXPENSE

    (prisma.movement.count as any).mockResolvedValue(5);

    const totals = await repository.getTotals();

    expect(totals.totalBalance).toBe(600);
    expect(totals.totalCount).toBe(5);
    expect(prisma.movement.aggregate).toHaveBeenCalledTimes(2);
  });

  it("should handle null sums in aggregates", async () => {
    (prisma.movement.aggregate as any)
      .mockResolvedValueOnce({ _sum: { amount: null } })
      .mockResolvedValueOnce({ _sum: { amount: null } });

    (prisma.movement.count as any).mockResolvedValue(0);

    const totals = await repository.getTotals();

    expect(totals.totalBalance).toBe(0);
    expect(totals.totalCount).toBe(0);
  });
});
