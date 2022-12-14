import gql from 'graphql-tag';

export const query_get_leads_by_userId = gql`
  query ($userIdStr: String!) {
    leadsByUser(userId: $userIdStr) {
      leadId
      email
      phone
      name
      age
      valor_total_plano
      status
      obs
      createdAt
      updatedAt
      icon
      userIdFk2{
        userId
        email
        name
        roleId
      }
    }
  }
`;

export const query_get_lead_by_id = gql`
  query ($leadIdStr: String!) {
    lead(leadId: $leadIdStr) {
      leadId
      email
      phone
      name
      age
      valor_total_plano
      status
      obs
      createdAt
      updatedAt
      icon
    }
  }
`;

export const mutation_add_lead = gql`
  mutation ($userRelatedStr: String!, $createLeadInput: CreateLeadInput!) {
    createLead(
      userRelated: $userRelatedStr
      createLeadInput: $createLeadInput
    ) {
      leadId
      email
      phone
      name
      age
      valor_total_plano
      status
      obs
      createdAt
      updatedAt
      icon
    }
  }
`;

export const mutation_update_lead = gql`
  mutation ($userRelatedStr: String!,$updateLeadInput: UpdateLeadInput!) {
    updateLead(userRelated: $userRelatedStr,updateLeadInput: $updateLeadInput) {
      leadId
      email
      phone
      name
      age
      valor_total_plano
      status
      obs
      createdAt
      updatedAt
      icon
    }
  }
`;

export const mutation_delete_lead = gql`
  mutation ($leadIdStr: String!) {
    removeLead(leadId: $leadIdStr)
  }
`;
