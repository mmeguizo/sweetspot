export enum ServiceType {
    Electrical = 'electrical',
    General = 'general',
    PestControl = 'pest-control',
    Plumbing = 'plumbing',
  }
  
  export const ALL_SERVICE_TYPES = [
    ServiceType.Electrical ,
    ServiceType.General ,
    ServiceType.PestControl ,
    ServiceType.Plumbing ,
  ];
  
  export interface MaintenanceRequest {
    // Name of the requester
    name: string;
    // Email of the requester
    email: string;
    // The unit # in the building
    unitNumber: string;
    // The type of service being requested
    serviceType: ServiceType;
    // A summary of of the issue
    summary: string;
    // Any extra details
    details?: string;
  }


  export interface UserToken {

    deleted :boolean;
    email: string;
    id : string;
    role: string;
    status : string;
    username : string;
  
  }
  
  export interface User {
    username: string;
    password: string;
  }
  

  // interface JWTPayload extends UserToken {
  //   // Additional properties specific to JWT payload
  //   iat: number;
  //   exp: number;
  // }
  
  // Usage example:
  export interface JWTPayload {
    id: string;
    email: string;
    username: string;
    role: string;
    status: string;
    deleted: boolean;
    iat: number; // Issued At (timestamp)
    exp: number; // Expiration (timestamp)
  }