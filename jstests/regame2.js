export function horizontalCollision(question, leftWall = 3, rightWall = 348) {
    if (question.x <= leftWall) {
        return { action: 'delete', xChange: 1 };
    } else if (question.x + 60 >= rightWall) {
        return { action: 'delete', xChange: -1 };
    }
    return { action: 'none', xChange: 0 };
}



