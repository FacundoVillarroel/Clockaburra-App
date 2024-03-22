class User {
  constructor(
    id,
    firstName,
    secondName,
    surname,
    rol,
    email,
    cellphone,
    image,
    address,
    bankDetails
  ) {
    this.id = id;
    this.rol = rol;
    this.isClockedIn = false;
    this.firstName = firstName;
    this.secondName = secondName;
    this.surname = surname;
    this.email = email;
    this.cellphone = cellphone;
    this.image = image;
    this.address = address;
    this.bankDetails = bankDetails;
    this.rate = null;
  }

  static toggleClockInState() {
    this.isClockedIn = !this.isClockedIn;
  }
}

export default User;
