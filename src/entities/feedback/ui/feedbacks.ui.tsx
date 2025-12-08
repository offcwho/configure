import { useUser } from "@/components/providers/UserContext"
import { FeedbackForm, FeedbackToUserForm } from ".."
import { useEffect, useState } from "react";
import { findAll } from "@/services/feedback.service";
import { UserProps } from "@/services/auth.service";

interface Props {
    productId: string;
}

interface DataProps {
    id: number;
    content: string;
    rating: number;
    user: UserProps;

    feedbackToUsers: {
        content: string;
        user: UserProps;
    }[]
}

export const FeedbacksUi: React.FC<Props> = ({ productId }) => {
    const [data, setData] = useState<DataProps[]>();
    const [isOpen, setIsOpen] = useState(0);
    const { user } = useUser();

    useEffect(() => {
        const Response = async () => {
            try {
                const response = await findAll(productId);
                setData(response);
            } catch (err: any) {
                console.log(err);
            }
        }
        Response()
    }, []);

    const handleOpen = (id: number) => {
        setIsOpen(id)
    }

    console.log(data);
    return (
        <div className="flex flex-col gap-3">
            {user && (
                <FeedbackForm productId={productId} />
            )}
            {data && (
                <div className="">
                    {data.map((item, index) => (
                        <div className="" key={index}>
                            <div className="">
                                <div className="">
                                    <h5>{item.user.name}</h5>
                                </div>
                                <div className="">{item.rating}</div>
                                <div className="">{item.content}</div>
                                <button onClick={() => handleOpen(item.id)}>{String('Ответить ->')}</button>
                            </div>
                            {isOpen === item.id && (
                                <FeedbackToUserForm feedbackId={String(item.id)} />
                            )}
                            {item.feedbackToUsers && (
                                <div className="">
                                    qwe
                                    {item.feedbackToUsers.map((item, index) => (
                                        <div className="" key={index}>
                                            <div className="">
                                                <h6>{item.user.name}</h6>
                                            </div>
                                            <div className="">
                                                {item.content}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}