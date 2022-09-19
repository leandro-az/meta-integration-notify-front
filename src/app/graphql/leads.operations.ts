import gql from 'graphql-tag';


export const query_get_leads_by_userId = gql`query ($userIdStr: String!) {
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
  }
}`;

export const query_get_lead_by_id = gql` query ($leadIdStr:String!) {
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
  }
}`;

export const mutation_add_lead = gql` mutation ($userRelatedStr:String!,$createLeadInput:CreateLeadInput!) {
    createLead(
      userRelated: $userRelatedStr
      createLeadInput: $createLeadInput
    )
    leadId
  }
`;

export const mutation_update_lead =  gql` mutation ($updateLeadInput: UpdateLeadInput!) {
    updateLead(updateLeadInput: $updateLeadInput){
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
  }
}`;

export const mutation_delete_lead = gql` mutation($leadIdStr: String!) {
  removeLead(leadId: $leadIdStr)
}`;
