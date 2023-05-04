import styled from "styled-components";

export const SelectWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Select = styled.select`
  margin: 0 0.3rem;
  padding: 0.375rem 1.875rem 0.375rem 0.875rem;
  font-weight: 400;
  line-height: 1.47;
  color: #495057;
  vertical-align: middle;
  background: #fff
    url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e")
    no-repeat right 0.875rem center/8px 10px;
`;
