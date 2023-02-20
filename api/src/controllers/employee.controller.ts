import { Request, Response, NextFunction } from "express";

import { IEmployee } from "../models/employee.model";
import EmployeeService from "../services/employee.service";
import { errorServerMessage } from "../utils/messages/error-messages";

class EmployeeController {
  async getEmployees(req: Request, res: Response, next: NextFunction) {
    try {
      const employees: IEmployee[] = await EmployeeService.getEmployees();
      return res.status(200).json({
        status: true,
        data: employees,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }

  async getEmployeeById(req: Request, res: Response, next: NextFunction) {
    try {
      const employee: IEmployee = await EmployeeService.getEmployeeById(
        req.params.employeeId
      );
      return res.status(200).json({
        status: true,
        data: employee,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }

  async createEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const employee: IEmployee = await EmployeeService.createEmployee(req.body);
      return res.status(200).json({
        status: true,
        data: employee,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }

  async updateEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const employee: IEmployee = await EmployeeService.updateEmployee(
        req.params.employeeId,
        req.body
      );
      return res.status(200).json({
        status: true,
        data: employee,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }

  async deleteEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted: boolean = await EmployeeService.deleteEmployee(
        req.params.employeeId
      );
      return res.status(200).json({
        status: deleted,
      });
    } catch (error) {
      return errorServerMessage(res);
    }
  }
}
export default new EmployeeController();
