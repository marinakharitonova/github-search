import {IRepository} from "./IRepository";

export interface IRepositoryExtended extends IRepository {
    "is_template": boolean,
    "topics": string[],
    "permissions": {
        "admin": boolean,
        "push": boolean,
        "pull": boolean
    },
    "allow_rebase_merge": boolean,
    "temp_clone_token": string,
    "allow_squash_merge": boolean,
    "allow_auto_merge": boolean,
    "delete_branch_on_merge": boolean,
    "allow_merge_commit": boolean,
    "subscribers_count": number,
    "network_count": number,
    "security_and_analysis": {
        "advanced_security": {
            "status": string
        },
        "secret_scanning": {
            "status": string
        },
        "secret_scanning_push_protection": {
            "status": string
        }
    }
}


