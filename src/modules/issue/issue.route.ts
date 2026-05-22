import { Router } from "express";
import { UserRole } from "../../types/types.index";
import auth from "../../middleware/auth";
import { issueController } from "./issue.controller";
import authenticateUser from "../../middleware/auth";
import requireMaintainer from "../../middleware/requireMaintainer";
import authorizeIssue from "../../middleware/authorizeIssue";

const router = Router()

router.post("/", authenticateUser(),issueController.createIssue )
router.get("/",issueController.getAllIssues)
router.get("/:id",issueController.getSingleIssue)
router.patch("/:id",authenticateUser(),authorizeIssue(UserRole.contributor, UserRole.maintainer),issueController.updateIssue)
router.delete("/:id",authenticateUser(),requireMaintainer(),issueController.deleteIssue)


export const issueRoute = router