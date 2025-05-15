import { View, Text, Switch } from 'react-native'

interface Props {
    id: string
    name: string
    enabled: boolean
    onToggle: (id: string, value: boolean) => void
}

export default function ETLAccessCard({ id, name, enabled, onToggle }: Props) {
    return (
        <View style={{
            borderWidth: 1,
            borderColor: '#1BA098',
            borderRadius: 10,
            padding: 12,
            margin: 6,
            width: 250,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fff'
        }}>
            <View>
                <Text style={{ fontWeight: 'bold' }}>ID:</Text>
                <Text style={{ marginBottom: 4 }}>{id}</Text>
                <Text style={{ fontWeight: 'bold' }}>Nombre:</Text>
                <Text>{name}</Text>
            </View>
            <Switch
                value={enabled}
                onValueChange={(value) => onToggle(id, value)}
                thumbColor={enabled ? '#00c851' : '#ccc'}
                trackColor={{ false: '#ccc', true: '#a0f3bd' }}
            />
        </View>
    )
}

