# StudySync – Interactive Student Learning Platform

## Overview

StudySync is a browser-based interactive learning platform designed to help students **learn, practice and track their understanding in one place**.

The platform combines subject-wise topics, simplified study notes, quizzes, learning progress and an overall assessment into a single student-friendly interface.

## Problem Statement

Students often use different resources for learning concepts, revising notes, practicing questions and checking their progress. This can make the learning process less organized and make it difficult to identify topics that need more attention.

StudySync addresses this by bringing these activities together in one simple platform.

## Solution

StudySync follows a simple learning cycle:

**Learn → Practice → Assess → Track Progress**

Students can:

- Explore subjects and topics
- Read simplified study notes
- Attempt an interactive quiz
- Receive an automatic performance result
- Track their learning progress
- View an overall assessment
- Save student details locally in the browser

## Key Features

### Subject & Topic Organization

Current subjects include:

- Compiler Design
- Data Structures
- Database Management
- Java – Coming Soon

### Simplified Study Notes

Current notes cover:

- **Compiler Design** – Lexical Analysis
- **Data Structures** – Stacks
- **Database Management** – SQL

### Interactive Practice Quiz

The platform includes a three-question multiple-choice quiz.

Performance is classified as:

- **Strong** – 80% or above
- **Average** – 50%–79%
- **Weak** – Below 50%

### Learning Progress

Quiz performance automatically updates the learning progress percentage and topic status.

### Overall Assessment

The application provides an assessment based on the student's quiz performance and indicates whether the student should continue learning, revise concepts or practice more.

### Student Details

Students can enter:

- Name
- Email
- Phone number
- Subject
- Topic
- Learning difficulty or weakness

The information is saved locally using browser `localStorage`.

## Technology Stack

- HTML5
- CSS3
- JavaScript
- Browser Local Storage

No external framework or backend is required for the current version.

## Accessibility

The project includes:

- Semantic HTML elements
- Proper form labels
- Fieldsets and legends
- Keyboard-visible focus indicators
- ARIA progress bar attributes
- Live regions for quiz and form feedback

## Responsive Design

The interface is designed for:

- Desktop
- Tablet
- Mobile

Responsive CSS breakpoints are included to adapt the layout to different screen sizes.

## User Flow

1. Open StudySync.
2. Explore the available subjects.
3. Review the available topics.
4. Read the study notes.
5. Attempt the quiz.
6. Submit the quiz.
7. View the score and performance classification.
8. Check the updated learning progress.
9. View the overall assessment.
10. Save student details for future use in the same browser.

## Performance

StudySync is lightweight because it:

- Uses plain HTML, CSS and JavaScript
- Does not require a frontend framework
- Does not require a backend for the current version
- Uses browser storage for small local data
- Avoids unnecessary external libraries

## Project Structure

```text
student-study-hub/
├── index.html
├── style.css
├── script.js
└── README.md
