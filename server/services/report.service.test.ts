import { describe, expect, it, mock, beforeEach } from "bun:test";
import { ReportService } from "./report.service";
import { IMovementRepository } from "../repositories/interfaces";
import { Prisma } from "@prisma/client";

describe("ReportService", () => {
  let reportService: ReportService;
  let mockRepository: IMovementRepository;

  beforeEach(() => {
    mockRepository = {
      findAll: mock(() => Promise.resolve([])),
      getTotals: mock(() => Promise.resolve({ totalBalance: 0, totalCount: 0 })),
      getDailySummary: mock(() => Promise.resolve([])),
      // Métodos de base que no usamos en ReportService pero pide la interfaz
      findById: mock(() => Promise.resolve(null)),
      create: mock(() => Promise.resolve({} as any)),
      update: mock(() => Promise.resolve({} as any)),
      delete: mock(() => Promise.resolve({} as any)),
    } as unknown as IMovementRepository;

    reportService = new ReportService(mockRepository);
  });

  describe("getReportData", () => {
    it("should return formatted report data from repository", async () => {
      const totals = { totalBalance: 500, totalCount: 2 };
      const chartData = [
        { date: "2024-01-01", income: 300, expense: 0 },
        { date: "2024-01-02", income: 200, expense: 0 },
      ];

      (mockRepository.getTotals as any).mockReturnValue(Promise.resolve(totals));
      (mockRepository.getDailySummary as any).mockReturnValue(Promise.resolve(chartData));

      const result = await reportService.getReportData();

      expect(result.totalBalance).toBe(500);
      expect(result.chartData).toEqual(chartData);
      expect(mockRepository.getTotals).toHaveBeenCalled();
      expect(mockRepository.getDailySummary).toHaveBeenCalled();
    });
  });

  describe("generateCSV", () => {
    it("should generate a correct CSV string with movements", async () => {
      const movements = [
        {
          concept: "INCOME",
          amount: new Prisma.Decimal(100),
          date: new Date("2024-01-10T12:00:00Z"),
          user: { name: "John Doe" },
        },
        {
          concept: "EXPENSE",
          amount: new Prisma.Decimal(50),
          date: new Date("2024-01-11T12:00:00Z"),
          user: { name: "Jane Smith" },
        },
      ] as any;

      (mockRepository.findAll as any).mockReturnValue(Promise.resolve(movements));

      const csv = await reportService.generateCSV();
      const lines = csv.split("\n");

      // Verify Header
      expect(lines[0]).toBe("Concepto,Monto,Fecha,Usuario");

      expect(lines).toHaveLength(3);

      expect(lines[1]).toContain("Ingreso");
      expect(lines[1]).toContain("100");
      expect(lines[1]).toContain("John Doe");

      expect(lines[2]).toContain("Egreso");
      expect(lines[2]).toContain("50");
      expect(lines[2]).toContain("Jane Smith");
    });

    it("should handle movements without user names", async () => {
      const movements = [
        {
          concept: "INCOME",
          amount: new Prisma.Decimal(10),
          date: new Date(),
          user: null,
        },
      ] as any;

      (mockRepository.findAll as any).mockReturnValue(Promise.resolve(movements));

      const csv = await reportService.generateCSV();
      expect(csv).toContain("Sistema");
    });
  });
});
