import {
  IQuestion,
  IQuestionList,
  ISolution,
  IAttachment,
} from "@/types/api_types";
import { IChoice } from "@/types/api_types";

/**
 * Checks whether two sets of typeform data are consistent by comparing the number of questions
 * and the equality of each question in the datasets.
 *
 * @param {IQuestionList} oldData
 * @param {IQuestionList} newData
 * @returns {boolean}
 */
export function isTypeformConsistent(
  oldData: IQuestionList,
  newData: IQuestionList
): boolean {
  if (oldData.questions.length !== newData.questions.length) {
    return false;
  }

  for (let i = 0; i < oldData.questions.length; i++) {
    if (!areQuestionsEqual(oldData.questions[i], newData.questions[i])) {
      return false;
    }
  }

  return true;
}

/**
 * Check if two questions are equal by comparing their properties.
 * @param {IQuestion} question1
 * @param {IQuestion} question2
 * @returns {boolean}
 */
export function areQuestionsEqual(
  question1: IQuestion,
  question2: IQuestion
): boolean {
  return (
    question1.id === question2.id &&
    question1.title === question2.title &&
    question1.ref === question2.ref &&
    question1.type === question2.type &&
    areChoicesEqual(question1.choices, question2.choices) &&
    areSolutionsEqual(question1.solutions, question2.solutions) &&
    question1.description === question2.description &&
    areAttachmentsEqual(question1.attachment, question2.attachment)
  );
}

/**
 * Check if two arrays of choices are equal.
 * @param {IChoice[] | undefined} choices1
 * @param {IChoice[] | undefined} choices2
 * @returns {boolean}
 */
export function areChoicesEqual(
  choices1: IChoice[] | undefined,
  choices2: IChoice[] | undefined
): boolean {
  if (!choices1 && !choices2) return true;
  if (!choices1 || !choices2 || choices1.length !== choices2.length)
    return false;

  for (let i = 0; i < choices1.length; i++) {
    if (
      choices1[i].id !== choices2[i].id ||
      choices1[i].label !== choices2[i].label ||
      choices1[i].ref !== choices2[i].ref
    ) {
      return false;
    }
  }
  return true;
}

/**
 * Check if two arrays of solutions are equal.
 * @param {ISolution[] | undefined} solutions1
 * @param {ISolution[] | undefined} solutions2
 * @returns {boolean}
 */
export function areSolutionsEqual(
  solutions1: ISolution[] | undefined,
  solutions2: ISolution[] | undefined
): boolean {
  if (!solutions1 && !solutions2) return true;
  if (!solutions1 || !solutions2 || solutions1.length !== solutions2.length)
    return false;

  for (let i = 0; i < solutions1.length; i++) {
    if (
      solutions1[i].id !== solutions2[i].id ||
      solutions1[i].title !== solutions2[i].title ||
      solutions1[i].url !== solutions2[i].url
    ) {
      return false;
    }
  }
  return true;
}

/**
 * Check if two attachments are equal.
 * @param {IAttachment | undefined} attachment1
 * @param {IAttachment | undefined} attachment2
 * @returns {boolean}
 */
export function areAttachmentsEqual(
  attachment1: IAttachment | undefined,
  attachment2: IAttachment | undefined
): boolean {
  if (!attachment1 && !attachment2) return true;
  if (!attachment1 || !attachment2) return false;
  return (
    attachment1.type === attachment2.type &&
    attachment1.href === attachment2.href
  );
}
