// Authentication interface
export interface IAuthenticationService {
  /**
   * 
   * @param decoded 
   */
  verifySession?(decoded: any): Promise<BikeVerifyContext["session"]>;
  // Otros métodos relacionados con autenticación
}

export interface BikeVerifyContext {
  session: {
    currentUser: any,
    data: any,
  };
}