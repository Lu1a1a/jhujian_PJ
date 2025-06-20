const firstNameRule = /^[a-zA-Z\u4e00-\u9fa5]+$/;
const lastNameRule = /^[a-zA-Z\u4e00-\u9fa5]+$/;
const telRule = /^\d{10}$/;
const mailRule = /^[^\s@]+@([^\s@]+\.)*(com\.tw|com|tw)$/;
const passwordRule = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{}|;:'",.<>\/?`~]{8,15}$/;

const firstNameAuth = (name: string) => {
  if (firstNameRule.test(name.toString())) {
    return true;
  }
  return false;
};
const lastNameAuth = (name: string) => {
  if (lastNameRule.test(name.toString())) {
    return true;
  }
  return false;
};
const telAuth = (tel: string) => {
  if (telRule.test(tel.toString())) {
    return true;
  }
  return false;
};
const mailAuth = (mail: string) => {
  if (mailRule.test(mail.toString())) {
    return true;
  }
  return false;
};
const passwordAuth = (pwd: string) => {
  if (passwordRule.test(pwd.toString())) {
    return true;
  }
  return false;
};

export { firstNameAuth, lastNameAuth, telAuth, mailAuth, passwordAuth };
