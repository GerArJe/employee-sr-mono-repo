import { FieldPath, FieldValue } from "firebase-admin/firestore";
import { db } from "../database/firebase";
import {
  ICreateEmployeeDTO,
  IEmployee,
  IUpdateEmployeeDTO,
} from "../models/employee.model";

class EmployeeService {
  async getEmployees(): Promise<IEmployee[]> {
    try {
      const snapshot = await db.collection("employees").get();
      const employees: IEmployee[] = [];
      snapshot.forEach((doc) => {
        employees.push({
          id: doc.id,
          accountId: doc.data().accountId,
          name: doc.data().name,
          cityId: doc.data().cityId,
          cellphone: doc.data().cellphone,
          email: doc.data().email,
          profileId: doc.data().profileId,
          about: doc.data().about,
          skills: doc.data().skills,
          softSkills: doc.data().softSkills,
        });
      });
      return employees;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getRecommendedEmployees(
    recommendedEmployeesIds: string[]
  ): Promise<IEmployee[]> {
    try {
      const snapshot = await db
        .collection("employees")
        .where(FieldPath.documentId(), "in", recommendedEmployeesIds)
        .get();
      const employees: IEmployee[] = [];
      snapshot.forEach((doc) => {
        employees.push({
          id: doc.id,
          accountId: doc.data().accountId,
          name: doc.data().name,
          cityId: doc.data().cityId,
          cellphone: doc.data().cellphone,
          email: doc.data().email,
          profileId: doc.data().profileId,
          about: doc.data().about,
          skills: doc.data().skills,
          softSkills: doc.data().softSkills,
        });
      });
      return employees;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getEmployeeById(employeeId: string): Promise<IEmployee> {
    try {
      const snapshot = await db.collection("employees").doc(employeeId).get();
      const employee: IEmployee = {
        id: snapshot.id,
        ...(snapshot.data() as IEmployee),
      };
      return employee;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createEmployee(employee: ICreateEmployeeDTO): Promise<IEmployee> {
    try {
      const snapshot = await db.collection("employees").add({
        timestamp: FieldValue.serverTimestamp(),
        ...employee,
      });
      const createdEmployee: IEmployee = {
        id: snapshot.id,
        ...employee,
      };
      return createdEmployee;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateEmployee(
    employeeId: string,
    employee: IUpdateEmployeeDTO
  ): Promise<IEmployee> {
    try {
      await db.collection("employees").doc(employeeId).update({
        ...employee,
        timestamp: FieldValue.serverTimestamp(),
      });
      return await this.getEmployeeById(employeeId);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteEmployee(employeeId: string): Promise<boolean> {
    try {
      await db.collection("employees").doc(employeeId).delete();
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default new EmployeeService();
