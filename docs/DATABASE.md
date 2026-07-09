# Database Design

## Overview
This document captures the data model for ATLAS AI Employee.

## Entities
### User
- id
- email
- name
- passwordHash
- createdAt
- updatedAt

### ChatSession
- id
- userId
- title
- createdAt
- updatedAt

### Message
- id
- chatSessionId
- role (user/system/assistant)
- content
- createdAt

### Lead
- id
- chatSessionId
- name
- email
- phone
- message
- status
- createdAt

## Notes
- Use UUIDs for IDs
- Keep schema simple for MVP
