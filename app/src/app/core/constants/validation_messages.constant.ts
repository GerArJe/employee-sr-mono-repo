export const VALIDATION_MESSAGES_LOGIN = {
  email: [
    { type: 'required', message: 'LOGIN.ERROR_MESSAGES.FIELD_REQUIRED' },
    { type: 'pattern', message: 'LOGIN.ERROR_MESSAGES.EMAIL_PATTERN' },
  ],
  password: [
    { type: 'required', message: 'LOGIN.ERROR_MESSAGES.FIELD_REQUIRED' },
    { type: 'minlength', message: 'LOGIN.ERROR_MESSAGES.PASSWORD_MIN_LENGTH' },
  ],
};

export const VALIDATION_MESSAGES_REGISTER = {
  userType: [
    { type: 'required', message: 'REGISTER.ERROR_MESSAGES.FIELD_REQUIRED' },
  ],
  email: [
    { type: 'required', message: 'REGISTER.ERROR_MESSAGES.FIELD_REQUIRED' },
    { type: 'pattern', message: 'REGISTER.ERROR_MESSAGES.EMAIL_PATTERN' },
  ],
  password: [
    { type: 'required', message: 'REGISTER.ERROR_MESSAGES.FIELD_REQUIRED' },
    {
      type: 'minlength',
      message: 'REGISTER.ERROR_MESSAGES.PASSWORD_MIN_LENGTH',
    },
    { type: 'matching', message: 'REGISTER.ERROR_MESSAGES.PASSWORD_MATCHING' },
  ],
  confirmPassword: [
    { type: 'required', message: 'REGISTER.ERROR_MESSAGES.FIELD_REQUIRED' },
    { type: 'matching', message: 'REGISTER.ERROR_MESSAGES.PASSWORD_MATCHING' },
  ],
  companyName: [
    {
      type: 'required',
      message: 'REGISTER.ERROR_MESSAGES.FIELD_REQUIRED',
    },
    {
      type: 'minlength',
      message: 'REGISTER.ERROR_MESSAGES.COMPANY_NAME_MIN_LENGTH',
    },
  ],
  nit: [
    { type: 'required', message: 'REGISTER.ERROR_MESSAGES.FIELD_REQUIRED' },
    { type: 'pattern', message: 'REGISTER.ERROR_MESSAGES.NIT_PATTERN' },
    { type: 'minlength', message: 'REGISTER.ERROR_MESSAGES.NIT_MIN_LENGTH' },
    { type: 'maxlength', message: 'REGISTER.ERROR_MESSAGES.NIT_MAX_LENGTH' },
  ],
  employeeName: [
    {
      type: 'required',
      message: 'REGISTER.ERROR_MESSAGES.FIELD_REQUIRED',
    },
    {
      type: 'minlength',
      message: 'REGISTER.ERROR_MESSAGES.EMPLOYEE_NAME_MIN_LENGTH',
    },
  ],
  profileId: [
    {
      type: 'required',
      message: 'REGISTER.ERROR_MESSAGES.FIELD_REQUIRED',
    },
  ],
  cityId: [
    {
      type: 'required',
      message: 'REGISTER.ERROR_MESSAGES.FIELD_REQUIRED',
    },
  ],
};

export const VALIDATION_MESSAGES_FORGOT_PASSWORD = {
  email: [
    {
      type: 'required',
      message: 'FORGOT_PASSWORD.ERROR_MESSAGES.FIELD_REQUIRED',
    },
    {
      type: 'pattern',
      message: 'FORGOT_PASSWORD.ERROR_MESSAGES.EMAIL_PATTERN',
    },
  ],
};

export const VALIDATION_MESSAGES_COMPANY_EDIT = {
  employeesNumber: [
    {
      type: 'required',
      message: 'COMPANY_EDIT.ERROR_MESSAGES.FIELD_REQUIRED',
    },
  ],
  creationDate: [
    {
      type: 'required',
      message: 'COMPANY_EDIT.ERROR_MESSAGES.FIELD_REQUIRED',
    },
  ],
  classificationId: [
    {
      type: 'required',
      message: 'COMPANY_EDIT.ERROR_MESSAGES.FIELD_REQUIRED',
    },
  ],
  web: [
    {
      type: 'required',
      message: 'COMPANY_EDIT.ERROR_MESSAGES.FIELD_REQUIRED',
    },
  ],
  cellphone: [
    {
      type: 'required',
      message: 'COMPANY_EDIT.ERROR_MESSAGES.FIELD_REQUIRED',
    },
  ],
};

export const VALIDATION_MESSAGES_EMPLOYEE_EDIT = {
  name: [
    {
      type: 'required',
      message: 'EMPLOYEE_EDIT.ERROR_MESSAGES.FIELD_REQUIRED',
    },
    {
      type: 'minlength',
      message: 'EMPLOYEE_EDIT.ERROR_MESSAGES.NAME_MIN_LENGTH',
    },
  ],
  cityId: [
    {
      type: 'required',
      message: 'EMPLOYEE_EDIT.ERROR_MESSAGES.FIELD_REQUIRED',
    },
  ],
  cellphone: [
    {
      type: 'required',
      message: 'EMPLOYEE_EDIT.ERROR_MESSAGES.FIELD_REQUIRED',
    },
  ],
  email: [
    {
      type: 'required',
      message: 'EMPLOYEE_EDIT.ERROR_MESSAGES.FIELD_REQUIRED',
    },
    { type: 'pattern', message: 'EMPLOYEE_EDIT.ERROR_MESSAGES.EMAIL_PATTERN' },
  ],
  profileId: [
    {
      type: 'required',
      message: 'EMPLOYEE_EDIT.ERROR_MESSAGES.FIELD_REQUIRED',
    },
  ],
  about: [
    {
      type: 'required',
      message: 'EMPLOYEE_EDIT.ERROR_MESSAGES.FIELD_REQUIRED',
    },
  ],
  skills: [
    {
      type: 'required',
      message: 'EMPLOYEE_EDIT.ERROR_MESSAGES.FIELD_REQUIRED',
    },
  ],
  softSkills: [
    {
      type: 'required',
      message: 'EMPLOYEE_EDIT.ERROR_MESSAGES.FIELD_REQUIRED',
    },
  ],
};

export const VALIDATION_MESSAGES_ADD_LIST = {
  text: [
    {
      type: 'required',
      message: 'ADD_LIST.ERROR_MESSAGES.FIELD_REQUIRED',
    },
    {
      type: 'minlength',
      message: 'ADD_LIST.ERROR_MESSAGES.MIN_LENGTH',
    },
  ],
};

export const VALIDATION_MESSAGES_EDIT_EXPERIENCES = {
  employeeId: [
    {
      type: 'required',
      message: 'EDIT_EXPERIENCES.ERROR_MESSAGES.FIELD_REQUIRED',
    },
  ],
  title: [
    {
      type: 'required',
      message: 'EDIT_EXPERIENCES.ERROR_MESSAGES.FIELD_REQUIRED',
    },
    {
      type: 'minlength',
      message: 'EDIT_EXPERIENCES.ERROR_MESSAGES.MIN_LENGTH',
    },
  ],
  companyName: [
    {
      type: 'required',
      message: 'EDIT_EXPERIENCES.ERROR_MESSAGES.FIELD_REQUIRED',
    },
    {
      type: 'minlength',
      message: 'EDIT_EXPERIENCES.ERROR_MESSAGES.MIN_LENGTH',
    },
  ],
  startDate: [
    {
      type: 'required',
      message: 'EDIT_EXPERIENCES.ERROR_MESSAGES.FIELD_REQUIRED',
    },
  ],
};

export const VALIDATION_MESSAGES_EDIT_EDUCATION = {
  employeeId: [
    {
      type: 'required',
      message: 'EDIT_EXPERIENCES.ERROR_MESSAGES.FIELD_REQUIRED',
    },
  ],
  school: [
    {
      type: 'required',
      message: 'EDIT_EXPERIENCES.ERROR_MESSAGES.FIELD_REQUIRED',
    },
    {
      type: 'minlength',
      message: 'EDIT_EXPERIENCES.ERROR_MESSAGES.MIN_LENGTH',
    },
  ],
  degree: [
    {
      type: 'required',
      message: 'EDIT_EXPERIENCES.ERROR_MESSAGES.FIELD_REQUIRED',
    },
    {
      type: 'minlength',
      message: 'EDIT_EXPERIENCES.ERROR_MESSAGES.MIN_LENGTH',
    },
  ],
  startDate: [
    {
      type: 'required',
      message: 'EDIT_EXPERIENCES.ERROR_MESSAGES.FIELD_REQUIRED',
    },
  ],
};

export const VALIDATION_MESSAGES_EDIT_CERTIFICATION = {
  employeeId: [
    {
      type: 'required',
      message: 'EDIT_EXPERIENCES.ERROR_MESSAGES.FIELD_REQUIRED',
    },
  ],
  name: [
    {
      type: 'required',
      message: 'EDIT_EXPERIENCES.ERROR_MESSAGES.FIELD_REQUIRED',
    },
    {
      type: 'minlength',
      message: 'EDIT_EXPERIENCES.ERROR_MESSAGES.MIN_LENGTH',
    },
  ],
  issuingOrganization: [
    {
      type: 'required',
      message: 'EDIT_EXPERIENCES.ERROR_MESSAGES.FIELD_REQUIRED',
    },
    {
      type: 'minlength',
      message: 'EDIT_EXPERIENCES.ERROR_MESSAGES.MIN_LENGTH',
    },
  ],
  issueDate: [
    {
      type: 'required',
      message: 'EDIT_EXPERIENCES.ERROR_MESSAGES.FIELD_REQUIRED',
    },
  ],
};
