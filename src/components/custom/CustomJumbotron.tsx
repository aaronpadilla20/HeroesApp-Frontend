interface Props {
    title: string;
    description?: string;
}

export const CustomJumbotron = ({ title, description }: Props) => {
    return (
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-indigo-400 mb-2 comic-relief-bold">{title}</h1>
            {
                description && (
                    <p className="text-gray-600">{description}</p>
                )
            }
        </div>
    )
}


