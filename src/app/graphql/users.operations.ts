import gql from 'graphql-tag';


export const query_get_user_by_email = gql` query ($emailStr:String!) {
    userByEmail(email: $emailStr) {
        userId
        email
        name
        createdAt
        updatedAt
        roleId
    }
}`;

export const query_get_employees_by_manager = gql` query ($managerUserIdStr:String!) {
    employeesByManager(managerUserId: $managerUserIdStr) {
        userId
        email
        name
        createdAt
        updatedAt
        role
    }
}`; 

export const query_get_manager_by_employee = gql` query ($employeeUserIdStr:String!) {
    managerByEmployee(employeeUserId: $employeeUserIdStr) {
        userId
        email
        name
        createdAt
        updatedAt
        role
    }
}`; 
  
export const query_get_user_intergration = gql` query ($managerUserIdStr:String!) {
    usersIntegration(managerUserId: $managerUserIdStr) {
        userIntegrationId
        integrationUrl
        integrationToken
        createdAt
        updatedAt
    }
}`; 

export const mutation_create_user_manager = gql` mutation ($createUserInput:CreateUserInput!) {
    createUserManager(
      createUserInput: $createUserInput
    )
        userId
        email
        name
        createdAt
        updatedAt
        role
  }
`;

export const mutation_create_user_employee = gql` mutation ($managerUserIdStr:String!,$createLeadInput:CreateLeadInput!) {
    createUserEmployee(
      managerUserId: $managerUserIdStr
      createLeadInput: $createLeadInput
    )
        userId
        email
        name
        createdAt
        updatedAt
        role
  }
`;

export const mutation_update_user = gql` mutation ($updateUserInput:UpdateUserInput!) {
    updateUser(
      updateUserInput: $updateUserInput
    )
        userId
        email
        name
        createdAt
        updatedAt
        role
  }
`;

export const mutation_creta_user_intergration = gql` query ($managerUserIdStr:String!) {
    usersIntegration(managerUserId: $managerUserIdStr) {
        userIntegrationId
        integrationUrl
        integrationToken
        createdAt
        updatedAt
    }
}`; 

export const mutation_delete_user_manager = gql` mutation($managerUserIdStr: String!) {
    removeUserManager(userId: $managerUserIdStr)
  }`;

export const mutation_delete_user_employee = gql` mutation($employeeUserIdStr: String!) {
    removeUserManager(userId: $employeeUserIdStr)
  }`;  
  
  