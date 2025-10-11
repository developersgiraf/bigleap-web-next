export default function VerticalLine() {
    return(
        <div style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '1px',
            borderRight: '1px solid',
            borderImage: 'linear-gradient(0deg, rgba(237, 33, 36, 0) 0%, rgba(237, 33, 36, 1) 50%, rgba(237, 33, 36, 0) 100%) 1',
            height: '60%'
        }}></div>
    )
}