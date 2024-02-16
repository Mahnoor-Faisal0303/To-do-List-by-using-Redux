import { useState } from 'react';

export interface EditHook {
    editedId: string;
    handleEditButtonClick: (id: string) => void;
}
interface EditHookProps {
    setShowUpdateButton:(a:boolean) => void;
    setShowAddButton:(a:boolean) => void;
    todoList:{ id: string; name: string }[];
    setTodoText:(b:string)=>void;
}

const useEditHook = ({setShowUpdateButton,setShowAddButton,todoList,setTodoText}:EditHookProps): EditHook => {

    const [editedId, setEditedId] = useState<string>("");

    const handleEditButtonClick = (id: string) => {
        setShowUpdateButton(true);
        setShowAddButton(false);
        const editedItem = todoList.find((item) => item.id === id);
        if (editedItem) {
            setTodoText(editedItem.name);
        }
        setEditedId(id);
    }
    return {
        editedId,
        handleEditButtonClick,
    };
};

export default useEditHook;